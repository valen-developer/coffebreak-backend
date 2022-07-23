import { User } from 'src/User/domain/User.mode';
import { enviroment } from '../enviroment';

export const registerHTML = (user: User, token: string): string => {
  return `
    <!DOCTYPE html>
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <title></title>
    <!--[if !mso]><!-- -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style type="text/css">
      #outlook a {
        padding: 0;
      }
      .ReadMsgBody {
        width: 100%;
      }
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass * {
        line-height: 100%;
      }
      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
      p {
        display: block;
        margin: 13px 0;
      }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
      @media only screen and (max-width: 480px) {
        @-ms-viewport {
          width: 320px;
        }
        @viewport {
          width: 320px;
        }
      }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <!--[if lte mso 11]>
      <style type="text/css">
        .outlook-group-fix {
          width: 100% !important;
        }
      </style>
    <![endif]-->
    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css?family=Lato:300,400,500,700"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700"
      rel="stylesheet"
      type="text/css"
    />
    <style type="text/css">
      @import url(https://fonts.googleapis.com/css?family=Lato:300,400,500,700);
      @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
    </style>
    <!--<![endif]-->
    <style type="text/css">
      @media only screen and (min-width: 480px) {
        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
        .mj-column-per-33 {
          width: 33.333333333333336% !important;
          max-width: 33.333333333333336%;
        }
      }
    </style>
    <style type="text/css">
      @media only screen and (max-width: 480px) {
        table.full-width-mobile {
          width: 100% !important;
        }
        td.full-width-mobile {
          width: auto !important;
        }
      }
    </style>
  </head>
  <body style="background-color: #0e0e0f">
    <div style="background-color: #0e0e0f">
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div
        style="
          background: #18181d;
          background-color: #18181d;
          margin: 0px auto;
          max-width: 600px;
        "
      >
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background: #18181d; background-color: #18181d; width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 10px 0;
                  text-align: center;
                  vertical-align: top;
                "
              >
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                <div
                  class="mj-column-per-100 outlook-group-fix"
                  style="
                    font-size: 13px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td style="vertical-align: top; padding: 0px">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            width="100%"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 18px 0px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: Lato, Helvetica, Arial,
                                      sans-serif;
                                    font-size: 20px;
                                    font-weight: bold;
                                    line-height: 1;
                                    text-align: center;
                                    color: #ffffff;
                                  "
                                >
                                  Coffebreak: Señal y ruido
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div
        style="
          background: #25252c;
          background-color: #25252c;
          margin: 0px auto;
          max-width: 600px;
        "
      >
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background: #25252c; background-color: #25252c; width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 0px;
                  padding-top: 20px;
                  text-align: center;
                  vertical-align: top;
                "
              >
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                <div
                  class="mj-column-per-100 outlook-group-fix"
                  style="
                    font-size: 13px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td style="vertical-align: top; padding: 0px">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            width="100%"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tbody>
                                    <tr>
                                      <td style="width: 192px">
                                        <img
                                          alt="logo"
                                          height="auto"
                                          src="https://img-static.ivoox.com/index.php?w=145&h=145&url=https://static-1.ivoox.com/canales/6/8/2/5/7381453715286_XXL.jpg"
                                          style="
                                            border: 0;
                                            border-radius: 10px;
                                            display: block;
                                            outline: none;
                                            text-decoration: none;
                                            height: auto;
                                            width: 100%;
                                          "
                                          width="192"
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: Lato, Helvetica, Arial,
                                      sans-serif;
                                    font-size: 25px;
                                    line-height: 1;
                                    text-align: center;
                                    color: #0ef13f;
                                  "
                                >
                                  <strong
                                    >Hey, ${
                                      user.name.value
                                    }<br /><br />Bienvenido a la
                                    app de Coffebreak</strong
                                  >
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 10px 30px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: Lato, Helvetica, Arial,
                                      sans-serif;
                                    font-size: 18px;
                                    line-height: 1;
                                    text-align: center;
                                    color: #838586;
                                  "
                                >
                                  <strong
                                    >Trabajaremos intensamente para que puedas
                                    disfrutar del mejor podcast de
                                    ciencia.</strong
                                  >
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div
        style="
          background: #25252c;
          background-color: #25252c;
          margin: 0px auto;
          max-width: 600px;
        "
      >
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background: #25252c; background-color: #25252c; width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  text-align: center;
                  vertical-align: top;
                "
              >
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:200px;" ><![endif]-->
                <div
                  class="mj-column-per-33 outlook-group-fix"
                  style="
                    font-size: 13px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td style="vertical-align: top; padding: 0px">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            width="100%"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 0 25px;
                                  word-break: break-word;
                                "
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tbody>
                                    <tr>
                                      <td style="width: 100px">
                                        <img
                                          alt="New York"
                                          height="auto"
                                          src="https://cdn-icons.flaticon.com/png/512/3158/premium/3158661.png?token=exp=1658362679~hmac=9cf9c8d0f186ae64ddc0b05cd05e33e0"
                                          style="
                                            border: 0;
                                            display: block;
                                            outline: none;
                                            text-decoration: none;
                                            height: auto;
                                            width: 100%;
                                          "
                                          width="100"
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                vertical-align="top"
                                style="
                                  font-size: 0px;
                                  padding: 20px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: Lato, Helvetica, Arial,
                                      sans-serif;
                                    font-size: 20px;
                                    line-height: 1;
                                    text-align: center;
                                    color: #72e08a;
                                  "
                                >
                                  <strong>Escucha</strong><br />
                                  <p style="font-size: 15px; color: #838586">
                                    Cuando quieras, donde quieras
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:200px;" ><![endif]-->
                <div
                  class="mj-column-per-33 outlook-group-fix"
                  style="
                    font-size: 13px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td style="vertical-align: top; padding: 0px">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            width="100%"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 0 25px;
                                  word-break: break-word;
                                "
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tbody>
                                    <tr>
                                      <td style="width: 100px">
                                        <img
                                          alt="London"
                                          height="auto"
                                          src="https://cdn-icons.flaticon.com/png/512/720/premium/720245.png?token=exp=1658362718~hmac=7a77d60950c2f40e094462bc30cad87c"
                                          style="
                                            border: 0;
                                            display: block;
                                            outline: none;
                                            text-decoration: none;
                                            height: auto;
                                            width: 100%;
                                          "
                                          width="100"
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                vertical-align="top"
                                style="
                                  font-size: 0px;
                                  padding: 20px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: Lato, Helvetica, Arial,
                                      sans-serif;
                                    font-size: 20px;
                                    line-height: 1;
                                    text-align: center;
                                    color: #72e08a;
                                  "
                                >
                                  <strong>Configura</strong><br />
                                  <p style="font-size: 15px; color: #838586">
                                    Playlists, canales, temporizador...
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:200px;" ><![endif]-->
                <div
                  class="mj-column-per-33 outlook-group-fix"
                  style="
                    font-size: 13px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td style="vertical-align: top; padding: 0px">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            width="100%"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 0 25px;
                                  word-break: break-word;
                                "
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tbody>
                                    <tr>
                                      <td style="width: 100px">
                                        <img
                                          alt="Berlin"
                                          height="auto"
                                          src="https://cdn-icons.flaticon.com/png/512/719/premium/719731.png?token=exp=1658362746~hmac=7fac39a618e2ddcad5fd2ca342922b92"
                                          style="
                                            border: 0;
                                            display: block;
                                            outline: none;
                                            text-decoration: none;
                                            height: auto;
                                            width: 100%;
                                          "
                                          width="100"
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                vertical-align="top"
                                style="
                                  font-size: 0px;
                                  padding: 20px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: Lato, Helvetica, Arial,
                                      sans-serif;
                                    font-size: 20px;
                                    line-height: 1;
                                    text-align: center;
                                    color: #72e08a;
                                  "
                                >
                                  <strong>Comparte</strong><br />
                                  <p style="font-size: 15px; color: #838586">
                                    El mejor regalo para la gente que quieres
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div
        style="
          background: #18181d;
          background-color: #18181d;
          margin: 0px auto;
          max-width: 600px;
        "
      >
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background: #18181d; background-color: #18181d; width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 10px;
                  text-align: center;
                  vertical-align: top;
                "
              >
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:580px;" ><![endif]-->
                <div
                  class="mj-column-per-100 outlook-group-fix"
                  style="
                    font-size: 13px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td style="vertical-align: top; padding: 0px">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            width="100%"
                          >
                            <tr>
                              <td
                                align="center"
                                vertical-align="middle"
                                style="
                                  font-size: 0px;
                                  padding: 0px;
                                  word-break: break-word;
                                "
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    border-collapse: separate;
                                    line-height: 100%;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      bgcolor="#1abe30"
                                      role="presentation"
                                      style="
                                        border: none;
                                        border-radius: 3px;
                                        cursor: auto;
                                        padding: 10px 25px;
                                        background: #1abe30;
                                      "
                                      valign="middle"
                                    >
                                      <p
                                        style="
                                          background: #1abe30;
                                          color: #ffffff;
                                          font-family: Ubuntu, Helvetica, Arial,
                                            sans-serif;
                                          font-size: 13px;
                                          font-weight: normal;
                                          line-height: 120%;
                                          margin: 0;
                                          text-decoration: none;
                                          text-transform: none;
                                        "
                                      >
                                        <a
                                          href="${
                                            enviroment().webappUrl
                                          }/auth/validate?token=${token}"
                                          style="
                                            text-decoration: none;
                                            color: white;
                                            font-size: 1.3rem;
                                            font-weight: bold;
                                          "
                                          >Activa tu cuenta</a
                                        >
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
    </div>
  </body>
</html>
`;
};
