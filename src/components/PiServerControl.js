import React from 'react';

const PiServerControl = ({ switchCommand }) => {

    async function sendControlCommand(command, serverUrl) {
        console.log(`Sending command: '${command}' to ${serverUrl}`);

        try {
            const response = await fetch(serverUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: command
            });

            const result = await response.json();

            if (response.ok) {
                console.log('hard camera click:', result);
            } else {
                console.error('hard camera click error:', response.status, result);
            }

            return result;

        } catch (error) {
            console.error('Failed to send command due to network or other error:', error);
            return null;
        }
    }

    const piServerControlUrl = 'http://192.168.0.135:5000/control';

    function sendSwitchCommand() {
        sendControlCommand(`${switchCommand}`, piServerControlUrl)
            .then(response => {
                if (response) {
                    console.log("Handling 'on' response:", response);
                }
            });
    }

    return (
        <div>
            <button className={`PiServerControlBtn`} onClick={sendSwitchCommand}>{switchCommand}</button>
        </div>
    );
};

export default PiServerControl;
