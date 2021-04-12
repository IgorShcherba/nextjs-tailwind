import { classNames } from "utils/classNames";

type ContainerProps = {
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames("container px-4 mx-auto", className)}>
      {children}
    </div>
  );
};
