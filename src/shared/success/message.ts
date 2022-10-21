export function SuccessMessage(msg: string, status: number = 200) {
  return {
    status,
    msg,
  };
}
