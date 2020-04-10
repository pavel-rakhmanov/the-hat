export function envVariableGetter (envVariableName: string) {
  const envVariableValue = process.env[envVariableName];

  if (envVariableValue !== undefined) return envVariableValue;

  throw new Error(`.env does nоt contain '${envVariableName}' variable`);
};
