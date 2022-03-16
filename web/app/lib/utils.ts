export const formatAccountString = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export const formatVotesString = (votesAmount: number) => {
  return `${votesAmount} vote${votesAmount > 1 ? "s" : ""}`;
};

export function isFormDataStringValid(
  str: FormDataEntryValue | null
): str is string {
  return typeof str === "string" || str != null || str !== "";
}

const UUID_REGEX =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

export function isStringValidUUID(str: string) {
  return UUID_REGEX.test(str);
}
