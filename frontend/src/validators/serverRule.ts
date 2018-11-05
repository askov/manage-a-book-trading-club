
interface ServerErrors {
  serverErrors: object;
}

export default function (field: string) {
  return (value: string, vm: ServerErrors) => {
    return !vm.serverErrors.hasOwnProperty(field);
  };
}
