// hooks/useOutsideAlerter.js

import { useEffect } from 'react';

interface UseOutsideAlerterProps {
    ref?: React.RefObject<HTMLElement>;
    onOutsideClick: () => void;
}  

export function useOutsideAlerter({ ref, onOutsideClick }: UseOutsideAlerterProps) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref && ref.current && !ref.current.contains(event.target as Node)) {
                onOutsideClick();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, onOutsideClick]);
}
