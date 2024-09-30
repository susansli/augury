import { ReactNode } from "react";
import { Toaster } from 'react-hot-toast';

interface Props {
	children?: ReactNode;
}

export default function BaseWrapper(props: Props): JSX.Element {
    return (
        <>
            <Toaster />
            {props?.children}
        </>
    );
}