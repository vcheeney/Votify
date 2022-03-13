export const formatAccountString = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export const formatVotesString = (votesAmount: number) => {
  return `${votesAmount} vote${votesAmount > 1 ? "s" : ""}`;
};
