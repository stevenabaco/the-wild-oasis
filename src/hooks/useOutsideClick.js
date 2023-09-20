import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
    const ref = useRef(); // This is a hook that creates a reference to the DOM element

	useEffect(
		function () {
			// This is a hook that runs after the component is mounted
			function handleClick(e) {
				// This is a function that runs when the user clicks on the document
				if (ref.current && !ref.current.contains(e.target)) {
					// If the user clicks outside the modal
					console.log("Click Outside");
					handler(); // Close the modal
				}
			}

			document.addEventListener("click", handleClick, listenCapturing); // ListenCapturing is true by default. Prevents bubbling.

			return () => document.removeEventListener("click", handleClick, true); // true means that the event will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
		},
		[handler, listenCapturing]
    );
    
    return ref;
}