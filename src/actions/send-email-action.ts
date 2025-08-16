"use server"
import { transporter } from "@/lib/nodemailer"

const emailStyles = {
    container: `
        max-width: 600px;
        margin: 0 auto;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    `,
    header: `
        background: linear-gradient(90deg, #00ff88 0%, #00cc6a 100%);
        padding: 30px 40px;
        margin: 0;
        text-align: center;
        border-bottom: 3px solid #00ff88;
    `,
    logo: `
        font-size: 32px;
        font-weight: bold;
        color: #000000;
        margin: 0 0 10px 0;
        text-transform: uppercase;
        letter-spacing: 2px;
    `,
    tagline: `
        font-size: 14px;
        color: #000000;
        margin: 0;
        opacity: 0.8;
    `,
    content: `
        padding: 40px;
        background: #1a1a1a;
    `,
    title: `
        font-size: 24px;
        font-weight: 600;
        color: #00ff88;
        margin: 0 0 20px 0;
        text-align: center;
    `,
    description: `
        font-size: 16px;
        line-height: 1.6;
        color: #cccccc;
        margin: 0 0 30px 0;
        text-align: center;
    `,
    buttonContainer: `
        text-align: center;
        margin: 30px 0;
    `,
    button: `
        display: inline-block;
        background: linear-gradient(45deg, #00ff88, #00cc6a);
        color: #000000;
        text-decoration: none;
        padding: 15px 40px;
        border-radius: 30px;
        font-weight: bold;
        font-size: 16px;
        text-transform: uppercase;
        letter-spacing: 1px;
        box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
        transition: all 0.3s ease;
    `,
    buttonHover: `
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 255, 136, 0.4);
    `,
    footer: `
        background: #0a0a0a;
        padding: 30px 40px;
        text-align: center;
        border-top: 1px solid #333333;
    `,
    footerText: `
        font-size: 12px;
        color: #888888;
        margin: 0 0 10px 0;
        line-height: 1.5;
    `,
    socialLinks: `
        margin: 15px 0 0 0;
    `,
    socialLink: `
        display: inline-block;
        margin: 0 10px;
        padding: 8px;
        background: #333333;
        border-radius: 50%;
        text-decoration: none;
        color: #00ff88;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
    `
};

export async function sendEmailAction({
    to,
    subject,
    meta
}: {
    to: string,
    subject: string,
    meta: {
        description: string,
        link: string
    }
}) {
    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to,
        subject: `Playgon - ${subject}`,
        html: `
            <div style="${emailStyles.container}">
                <!-- Header Section -->
                <div style="${emailStyles.header}">
                    <h1 style="${emailStyles.logo}">PLAYGON</h1>
                    <p style="${emailStyles.tagline}">Elite Sports Gaming Platform</p>
                </div>

                <!-- Main Content -->
                <div style="${emailStyles.content}">
                    <h2 style="${emailStyles.title}">${subject}</h2>
                    <p style="${emailStyles.description}">${meta.description}</p>
                    
                    <div style="${emailStyles.buttonContainer}">
                        <a href="${meta.link}" 
                           style="${emailStyles.button}"
                           onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(0, 255, 136, 0.4)';"
                           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(0, 255, 136, 0.3)';">
                            ${subject === "Reset Password on your playgon account" ? "Reset Password" : "Verify your Email"}
                        </a>
                    </div>

                    <p style="${emailStyles.description}">
                This link will expire in 30 minutes for security purposes.
                 </p>
                </div>

                <!-- Footer Section -->
                <div style="${emailStyles.footer}">
                    <p style="${emailStyles.footerText}">
                        Welcome to Playgon - Where champions are made.<br>
                        If you didn't create an account, please ignore this email.
                    </p>
                    
                    <div>
                        <a href="#" >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                                <g fill="#000000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8.53333,8.53333)"><path d="M26.37,26l-8.795,-12.822l0.015,0.012l7.93,-9.19h-2.65l-6.46,7.48l-5.13,-7.48h-6.95l8.211,11.971l-0.001,-0.001l-8.66,10.03h2.65l7.182,-8.322l5.708,8.322zM10.23,6l12.34,18h-2.1l-12.35,-18z"></path></g></g>
                                </svg>
                        </a>
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                                <radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"></stop><stop offset=".328" stop-color="#ff543f"></stop><stop offset=".348" stop-color="#fc5245"></stop><stop offset=".504" stop-color="#e64771"></stop><stop offset=".643" stop-color="#d53e91"></stop><stop offset=".761" stop-color="#cc39a4"></stop><stop offset=".841" stop-color="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"></stop><stop offset=".999" stop-color="#4168c9" stop-opacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
                            </svg>
                        </a>
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48" viewBox="0 0 470 468" id="Email">
                                <defs>
                                <filter id="a" width="111.8%" height="111.9%" x="-5.9%" y="-3.9%" filterUnits="objectBoundingBox">
                                <feOffset dy="5" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                    <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="4"></feGaussianBlur>
                                    <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.078125 0"></feColorMatrix>
                                <feOffset dy="4" in="SourceAlpha" result="shadowOffsetOuter2"></feOffset>
                                <feGaussianBlur in="shadowOffsetOuter2" result="shadowBlurOuter2" stdDeviation="5.5"></feGaussianBlur>
                                <feColorMatrix in="shadowBlurOuter2" result="shadowMatrixOuter2" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.210824275 0"></feColorMatrix>
                                <feMerge>
                                 <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                                <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                            </feMerge>
                            </filter>
                            <path id="b" d="M9.635 132.808C24.782 59.782 71.388 19.109 144.085 6.822c53.74-9.081 107.5-9.196 161.15.255 74.852 13.185 119.85 56.23 134.185 130.36 11.075 57.29 11.249 115.191-.174 172.427-15.324 72.52-63.132 117.285-135.561 129.527-53.74 9.08-107.5 9.195-161.15-.255-74.852-13.186-120.05-58.38-134.384-132.509-11.64-57.668-10.52-115.935 1.484-173.82z"></path>
                            </defs>
                            <g fill="none" fill-rule="evenodd">
                           <g transform="translate(11 7)" fill="#2a2626" class="color000000 svgShape">
                            <use xlink:href="#b" fill="#2a2626" filter="url(#a)" class="color000000 svgShape"></use>
                            <use xlink:href="#b" fill="#43ab66" class="colorff5439 svgShape"></use>
                            </g>
                            <path fill="#ffffff" d="M103 335V146.778c0-9.818 7.96-17.778 17.778-17.778H366.23v18.979H121.98V335H103zm56.476-155.242 68.387 70.206c4.65 4.98 12.439 5.3 17.483.72 0 0 59.533-52.916 76.105-67.126 16.571-14.21 44.778-10.23 44.778 10.935v100.538c0 22.075-17.894 39.969-39.969 39.969H152.417v-18.978h173.506c11.777 0 21.327-9.55 21.327-21.329v-96.016c0-7.113-4.937-6.375-8.043-3.59l-88.475 76.36c-8.785 7.88-22.26 7.274-30.302-1.363l-74.823-77.37 13.869-12.956z" class="colorffffff svgShape"></path>
                            </g>
                        </svg>
                        </a>
                    </div>
                    
                    <p style="${emailStyles.footerText}">
                        © 2025 Playgon. All rights reserved.
                    </p>
                </div>
            </div>
        `
    }


    try {
        await transporter.sendMail(mailOptions)
        return { success: true, error: false }
    } catch (error) {
        console.log("sendEmailOptions", error)
        return { error: true, success: false }
    }
}