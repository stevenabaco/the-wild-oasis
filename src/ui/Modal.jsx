import { useRef } from "react";
import { cloneElement, createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

const ModalContext = createContext();

function Modal({ children }) {
	const [openName, setOpenName] = useState("");

	const close = () => setOpenName("");
	const open = setOpenName;

	return (
		<ModalContext.Provider value={{ openName, open, close }}>{children}</ModalContext.Provider>
	);
}

function Open({ children, opens: opensWindowName }) {
	const { open } = useContext(ModalContext);
	return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) { // name is the name of the window
  const { openName, close } = useContext(ModalContext); // openName is the name of the open window
  const ref = useOutsideClick(close); // This is a hook that runs after the component is mounted

	if (name !== openName) return null; // If the name of the window is not the same as the name of the open window, return null

	return createPortal(
		<Overlay> {/* This is the backdrop*/}
			<StyledModal ref={ref}> {/* This is the modal */}
				<Button onClick={close}> {/* This is the close button */}
					<HiXMark /> {/* This is the close icon */}
				</Button> {/* This is the close button */}
				<div>{cloneElement(children, { onCloseModal: close })}</div> {/* This is the content of the modal */}
			</StyledModal>  {/* This is the modal */}
		</Overlay>, document.body
	);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
