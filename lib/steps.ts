export const orderedSteps = [
  "/step-one",
  "/step-two",
  "/step-three",
  "/step-four",
] as const;

export type StepPath = (typeof orderedSteps)[number];

export const stepLabels: Record<StepPath, string> = {
  "/step-one": "Step 1",
  "/step-two": "Step 2",
  "/step-three": "Step 3",
  "/step-four": "Step 4",
};

export function getStepIndexByPathname(pathname: string | null | undefined) {
  if (!pathname) return -1;
  return orderedSteps.findIndex((p) => p === pathname);
}

export function getNextStepPath(pathname: string | null | undefined): StepPath {
  const index = getStepIndexByPathname(pathname);
  if (index === -1) return orderedSteps[0];
  const nextIndex = (index + 1) % orderedSteps.length;
  return orderedSteps[nextIndex];
}

export function getStepLabelByIndex(index: number) {
  if (index < 0 || index >= orderedSteps.length) return "Unknown";
  return stepLabels[orderedSteps[index]];
}

export function getStepLabelByPath(pathname: string | null | undefined) {
  const index = getStepIndexByPathname(pathname);
  return getStepLabelByIndex(index);
}
