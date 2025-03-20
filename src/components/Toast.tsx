import { AlertStatus, Button, useToast } from "@chakra-ui/react";

function Toast() {
    const toast = useToast();

    const statuses: Array<AlertStatus> = ['error', 'warning', 'success']

    const showToast = () => {
        for (let i = 0; i < statuses.length; i++) {
            toast({
                title: statuses[i],
                description: "This is a warning toast.",
                status: statuses[i],
                duration: 5000,
                isClosable: true,
                position: "top-right",
                variant: "left-accent",
            });
        }
    };


    return <Button colorScheme="blue" onClick={showToast}>Show Toast</Button>;
}

export default Toast;
