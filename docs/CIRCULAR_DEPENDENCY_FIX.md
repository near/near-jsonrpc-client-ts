# NonDelegateAction Circular Dependency Fix

## Problem

The NEAR OpenAPI specification has a circular dependency between `Action`, `DelegateAction`, and `NonDelegateAction` schemas that causes TypeScript to lose type inference, requiring `: any` type annotations.

### The Circular Dependency Chain

1. `Action` schema includes all action types, including `Delegate`
2. `Delegate` action contains a `SignedDelegateAction`  
3. `SignedDelegateAction` contains a `DelegateAction`
4. `DelegateAction` contains an array of `NonDelegateAction`
5. `NonDelegateAction` in the spec uses `allOf` to reference `Action` ❌ **This creates the circle**

```
Action → Delegate → SignedDelegateAction → DelegateAction → NonDelegateAction → Action
```

## Current Workaround in Main Branch

The main branch handles this by adding `: any` type annotations to these schemas:
- `ActionSchema: any`
- `DelegateActionSchema: any`
- `SignedDelegateActionSchema: any`
- `NonDelegateActionSchema: any`

This works but loses all TypeScript type safety and IDE support for these critical types.

## Solution Demonstrated in This Branch

This branch modifies the code generator to handle `NonDelegateAction` specially by:
1. Detecting when generating `NonDelegateActionSchema`
2. Instead of following the spec's `allOf: [{$ref: "#/components/schemas/Action"}]`
3. Explicitly generating a union of all action types EXCEPT `Delegate`

### Implementation

The fix is in `tools/codegen/generate.ts`:

```typescript
if (schemaName === 'NonDelegateAction') {
  // NonDelegateAction should explicitly list all actions except Delegate
  // This breaks the circular dependency with DelegateAction
  const actionSchema = schemas['Action'];
  if (actionSchema && actionSchema.oneOf) {
    // Filter out the Delegate action
    const nonDelegateActions = actionSchema.oneOf.filter((action: any) => {
      return !action.properties || !action.properties.Delegate;
    });
    
    // Generate the union of all non-delegate actions
    const actionOptions = nonDelegateActions.map((action: any) => 
      generateZodSchema(action, schemas, 1)
    );
    zodMiniSchema = `z.union([${actionOptions.join(', ')}])`;
  }
}
```

This generates:
```typescript
export const NonDelegateActionSchema = () => z.union([
  z.object({ CreateAccount: z.lazy(() => CreateAccountActionSchema()) }),
  z.object({ DeployContract: z.lazy(() => DeployContractActionSchema()) }),
  z.object({ FunctionCall: z.lazy(() => FunctionCallActionSchema()) }),
  z.object({ Transfer: z.lazy(() => TransferActionSchema()) }),
  z.object({ Stake: z.lazy(() => StakeActionSchema()) }),
  z.object({ AddKey: z.lazy(() => AddKeyActionSchema()) }),
  z.object({ DeleteKey: z.lazy(() => DeleteKeyActionSchema()) }),
  z.object({ DeleteAccount: z.lazy(() => DeleteAccountActionSchema()) }),
  z.object({ DeployGlobalContract: z.lazy(() => DeployGlobalContractActionSchema()) }),
  z.object({ UseGlobalContract: z.lazy(() => UseGlobalContractActionSchema()) })
]);
```

## Benefits

With this fix:
1. ✅ No more `: any` type annotations needed
2. ✅ Full TypeScript type inference restored
3. ✅ IDE autocomplete and type checking work properly
4. ✅ All tests pass
5. ✅ No runtime behavior changes

## Ideal Solution

The ideal fix would be in the OpenAPI specification itself. The spec maintainers should change `NonDelegateAction` from:

```json
{
  "NonDelegateAction": {
    "allOf": [
      {"$ref": "#/components/schemas/Action"}
    ],
    "description": "..."
  }
}
```

To:

```json
{
  "NonDelegateAction": {
    "oneOf": [
      {"type": "object", "properties": {"CreateAccount": {"$ref": "#/components/schemas/CreateAccountAction"}}, "required": ["CreateAccount"]},
      {"type": "object", "properties": {"DeployContract": {"$ref": "#/components/schemas/DeployContractAction"}}, "required": ["DeployContract"]},
      {"type": "object", "properties": {"FunctionCall": {"$ref": "#/components/schemas/FunctionCallAction"}}, "required": ["FunctionCall"]},
      {"type": "object", "properties": {"Transfer": {"$ref": "#/components/schemas/TransferAction"}}, "required": ["Transfer"]},
      {"type": "object", "properties": {"Stake": {"$ref": "#/components/schemas/StakeAction"}}, "required": ["Stake"]},
      {"type": "object", "properties": {"AddKey": {"$ref": "#/components/schemas/AddKeyAction"}}, "required": ["AddKey"]},
      {"type": "object", "properties": {"DeleteKey": {"$ref": "#/components/schemas/DeleteKeyAction"}}, "required": ["DeleteKey"]},
      {"type": "object", "properties": {"DeleteAccount": {"$ref": "#/components/schemas/DeleteAccountAction"}}, "required": ["DeleteAccount"]},
      {"type": "object", "properties": {"DeployGlobalContract": {"$ref": "#/components/schemas/DeployGlobalContractAction"}}, "required": ["DeployGlobalContract"]},
      {"type": "object", "properties": {"UseGlobalContract": {"$ref": "#/components/schemas/UseGlobalContractAction"}}, "required": ["UseGlobalContract"]}
    ],
    "description": "..."
  }
}
```

This would properly express that `NonDelegateAction` is any action type except `Delegate`, breaking the circular dependency at the specification level.

## Testing

Run the following to verify the fix works:
```bash
# Regenerate types
pnpm generate

# Run type checking
pnpm typecheck

# Run tests
pnpm test --run
```

All tests pass with full type safety restored.