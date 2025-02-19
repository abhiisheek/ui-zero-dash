import { FC, memo, useMemo } from "react";

import { Flex, Spin } from "antd";

import messages from "@/constants/messages";

interface LoaderProps {
  overlay?: boolean;
  fullScreen?: boolean;
}

const Loader: FC<LoaderProps> = ({ overlay = false, fullScreen = false }) => {
  const overlayStyles = useMemo(
    () => (overlay ? "absolute w-full top-0 left-0 z-[1002] bg-[#0000004d]" : ""),
    [overlay],
  );

  return (
    <Flex justify='center' align='center' className={`h-full ${overlayStyles}`}>
      <Spin size='large' tip={messages.LOADING} fullscreen={fullScreen} />
    </Flex>
  );
};

export default memo(Loader);
