const resolveInstanceName = () => {
    const clientNameArg = process.argv.indexOf('--name');
    let clientName = 'default'

    if (clientNameArg !== -1) {
        clientName = process.argv[clientNameArg + 1];
    }

    return clientName
}


export {resolveInstanceName};