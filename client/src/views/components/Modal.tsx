import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import { useClickOutside } from "../hooks/useClickOutside";

export type ModalProps = {
  children: ReactNode;
  onClickOutside?: () => void;
};

export const Modal = ({ children, onClickOutside = () => {} }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const ref = useRef(null);

  useClickOutside(ref, onClickOutside);

  return (
    <Modal.Wrapper>
      <Modal.Overlay />
      <Modal.Content ref={ref}>{children}</Modal.Content>
    </Modal.Wrapper>
  );
};

Modal.Wrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

Modal.Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
`;

Modal.Content = styled.div`
  display: contents;
`;
