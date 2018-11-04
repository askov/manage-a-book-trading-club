import { helpers } from 'vuelidate/lib/validators';

interface ServerErrors {
  serverErrors: object
  form: object
}
export default function (field: string) {
  return (value: object, vm: ServerErrors) => {
    console.log('#this inside', vm);
    return true;
  };
  // return () => data && !data.hasOwnProperty(field);
  // return (value) => !helpers.req(value) || value.indexOf(param) >= 0
}
