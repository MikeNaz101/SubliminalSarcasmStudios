import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = { width: 256, height: 256 };
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#00ffff', // Slate-950
                    borderRadius: '60px',
                    border: '10px solid #064e3b',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center', // Centers the S's vertically relative to each other
                        justifyContent: 'center',
                        color: '#000000',
                        fontWeight: 900, // Maximum CSS boldness
                        fontFamily: 'system-ui, sans-serif', // Forces the browser to use a thick native font
                        lineHeight: 1, // Removes hidden padding above/below the text
                    }}
                >
                    {/* Left S */}
                    <span style={{ fontSize: 100 }}>S</span>

                    {/* Middle S */}
                    <span style={{ fontSize: 140, margin: '0 -1px' }}>S</span>

                    {/* Right S */}
                    <span style={{ fontSize: 200 }}>S</span>
                </div>
            </div>
        ),
        { ...size }
    );
}