declare module 'vuelidate' {
  import Vue, { PluginFunction } from 'vue'

  import { Params, ValidationRule, ValidationParams } from 'vuelidate/lib/validators'
  export { Params, ValidationRule, ValidationParams } from 'vuelidate/lib/validators'

  /**
   * Covers beforeCreate(), beforeDestroy() and data().
   *
   * No public members.
   */
  export const validationMixin: any

  // const Validation
  export interface Validation extends Vue {
    // const validationGetters
    readonly $invalid: boolean
    readonly $dirty: boolean
    readonly $error: boolean
    readonly $pending: boolean
    readonly $params: { [attr: string]: any }

    // const validationMethods
    $touch(): never
    $reset(): never
    $flattenParams(): ValidationParams[]
  }


  // vue plugin
  export const Vuelidate: PluginFunction<any>

  export default Vuelidate

  // vue augmentation

  type ValidationDecl = ValidationRule | ((...args: any[]) => ValidationRule)

  interface FlatValidationDecl {
    [attr: string]: ValidationDecl
  }

  interface NamedValidationDecl {
    [rule: string]: ValidationDecl | FlatValidationDecl | NamedValidationDecl
  }

  interface NestedValidationDecl {
    [attr: string]: ValidationDecl | FlatValidationDecl | NamedValidationDecl | NestedValidationDecl
  }

  interface ValidationGroupDecl {
    validationGroup?: string[]
  }

  type ValidationDecls = ValidationDecl | FlatValidationDecl | NamedValidationDecl | NestedValidationDecl | ValidationGroupDecl

  module 'vue/types/vue' {
    interface Vue {
      $v: { [attr: string]: Validation } & Validation

      delayTouch(v: Validation): undefined

      validations(): ValidationDecls
    }
  }

  module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
      validations?: ValidationDecls
    }
  }
}