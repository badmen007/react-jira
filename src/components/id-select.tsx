import { Select } from "antd";
import { Raw } from "types";

// 就能把这个组件的属性全部抽取出来
type IProps = Omit<
  React.ComponentProps<typeof Select>,
  "value" | "onChange" | "options"
>;

// 当你的类型和要继承的类型有相同的键的时候 会出现类型的错误 所以要用Omit将重合的属性删除
interface IdSelectProps extends IProps {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: string }[];
}

/**
 * value 可以传入多种类型的值
 * onChange 只会回调number|undefined
 * 当 isNaN(Number(value)) 为true的时候，代表选择的时默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(Number(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
