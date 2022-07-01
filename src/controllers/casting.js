export default function (view) {
    view.addEventListener('viewdestroy', () => {
        console.log('I was destroyed');
    });
    view.addEventListener('viewbeforehide', () => {
        console.log('I was viewbeforehide');
    });
    view.addEventListener('viewshow', () => {
        console.log('I was shown');
        tizen.systeminfo.getPropertyValue(
            'VIDEOSOURCE',
            (sources) => {
                const source = sources.connected.find((label) => {
                    return (label.type === 'HDMI' && label.number === 1);
                });
                if (typeof(source) !== 'undefined' && source !== null) {
                    tizen.tvwindow.setSource(
                        source,
                        () => {
                            tizen.tvwindow.show(() => { }, null, [
                                '0',
                                '0',
                                '1920',
                                '1080'
                            ]);
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
                }
            }
        );
    });
}
