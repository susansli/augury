import { Button, useDisclosure } from "@chakra-ui/react";
import CreateGroupModal from "../components/portfolio/CreateGroupModal";

export default function Portfolio(): JSX.Element {
    
    const disclosure = useDisclosure();

    return (
        <>
        <Button onClick={disclosure.onOpen}>click</Button>
        <CreateGroupModal disclosure={disclosure} />
        </>
    );
}