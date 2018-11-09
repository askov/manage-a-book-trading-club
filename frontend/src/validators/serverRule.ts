
interface ServerErrors {
  email?: string[];
  username?: string[];
  password?: string[];
  passwordConfirm?: string[];
}

interface FormObject {
  serverErrors: ServerErrors;
}




export default function (field: string) {
  return (value: string, vm: FormObject) => {
    return !vm.serverErrors.hasOwnProperty(field);
  };
}
