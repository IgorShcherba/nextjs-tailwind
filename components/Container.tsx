type ContainerProps = {
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`container px-4 mx-auto ${className ?? ""}`}>
      {children}
    </div>
  );
};
