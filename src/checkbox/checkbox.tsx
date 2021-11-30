import Vue, { VNode, VueConstructor } from 'vue';
import { renderContent } from '../utils/render-tnode';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import checkboxProps from './props';
import Group from './group';
import { ClassName } from '../common';
import { emitEvent } from '../utils/event';
import { TdCheckboxProps } from './type';

const name = `${prefix}-checkbox`;

interface CheckboxInstance extends Vue {
  checkboxGroup: InstanceType<typeof Group>;
}

export default (Vue as VueConstructor<CheckboxInstance>).extend({
  name: 'TCheckbox',
  inheritAttrs: false,
  props: { ...checkboxProps },
  inject: {
    checkboxGroup: { default: undefined },
  },

  data() {
    return {
      // used for controlled component
      oldValue: undefined,
    };
  },

  watch: {
    checked$: {
      immediate: true,
      handler(val) {
        this.oldValue = val;
      },
    },
  },

  computed: {
    labelClasses(): ClassName {
      return [
        `${name}`,
        {
          [CLASSNAMES.STATUS.checked]: this.checked$,
          [CLASSNAMES.STATUS.disabled]: this.disabled$,
          [CLASSNAMES.STATUS.indeterminate]: this.indeterminate$,
        },
      ];
    },
    disabled$(): boolean {
      if (!this.checkAll && !this.checked$ && this.checkboxGroup?.maxExceeded) {
        return true;
      }
      if (this.disabled !== undefined) return this.disabled;
      return !!(this.checkboxGroup?.disabled);
    },
    name$(): string {
      return this.name || (this.checkboxGroup?.name);
    },
    checked$(): boolean {
      if (this.checkAll) return this.checkboxGroup?.isCheckAll;
      return this.checkboxGroup
        ? !!this.checkboxGroup.checkedMap[this.value]
        : this.checked;
    },
    indeterminate$(): boolean {
      if (this.checkAll) return this.checkboxGroup?.indeterminate;
      return this.indeterminate;
    },
  },

  render(): VNode {
    return (
      <label class={this.labelClasses}>
        <input
          type='checkbox'
          class={`${name}__former`}
          disabled={this.disabled$}
          readonly={this.readonly}
          indeterminate={this.indeterminate$}
          name={this.name$}
          value={this.value}
          checked={this.checked$}
          onChange={this.handleChange}
        ></input>
        <span class={`${name}__input`}></span>
        <span class={`${name}__label`}>
          {renderContent(this, 'default', 'label')}
        </span>
      </label>
    );
  },

  methods: {
    handleChange(e: Event) {
      const value = !this.checked$;
      if (this.oldValue === value) return;
      emitEvent<Parameters<TdCheckboxProps['onChange']>>(this, 'change', value, { e });
      this.oldValue = value;
      e.stopPropagation();
      this?.checkboxGroup?.$emit('checked-change', {
        checked: value,
        checkAll: this.checkAll,
        e,
        option: this.$props,
      });
    },
  },
});
