export const EMAIL_VERIFICATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 600px;">
          <!-- Header -->
          <tr>
            <td style="padding: 30px 40px; background-color: #4F46E5; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Welcome to [Organization Name]</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 40px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px;">
                Hello <strong style="color: #4F46E5;">{username}</strong>,
              </h2>
              
              <p style="color: #4b5563; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                We're excited to welcome you to our organization! To complete your verification, please use the following code:
              </p>
              
              <!-- Verification Code Box -->
              <div style="background-color: #f9fafb; border: 2px dashed #4F46E5; border-radius: 6px; padding: 20px; text-align: center; margin: 25px 0;">
                <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">Your Verification Code</p>
                <p style="color: #1f2937; margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 2px; font-family: 'Courier New', monospace;">
                  {verificationCode}
                </p>
              </div>
              
              <p style="color: #4b5563; margin: 20px 0 0 0; font-size: 16px; line-height: 1.6;">
                This code is valid for <strong>10 minutes</strong>. If you didn't request this verification, please ignore this email.
              </p>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="{verificationLink}" style="background-color: #4F46E5; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-size: 16px; display: inline-block;">
                  Verify My Account
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 25px 40px; background-color: #f9fafb; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 13px;">
                Need help? Contact us at <a href="mailto:support@[organization].com" style="color: #4F46E5; text-decoration: none;">support@[organization].com</a>
              </p>
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                © 2026 [Organization Name]. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

export const EMAIL_VERIFICATION_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Verified Successfully</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 600px;">
          <!-- Header with Success Icon -->
          <tr>
            <td style="padding: 40px 40px 30px 40px; background-color: #ffffff; text-align: center; border-radius: 8px 8px 0 0;">
              <!-- Success Checkmark Icon -->
              <div style="width: 80px; height: 80px; background-color: #10B981; border-radius: 50%; display: inline-block; text-align: center; line-height: 80px; margin-bottom: 20px;">
                <span style="color: #ffffff; font-size: 48px; font-weight: bold;">✓</span>
              </div>
              <h1 style="color: #1f2937; margin: 0; font-size: 28px;">Verified Successfully!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px 40px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 22px;">
                Welcome <strong style="color: #10B981;">{username}</strong> to [Organization Name]!
              </h2>
              
              <p style="color: #4b5563; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                Your email has been successfully verified. We're thrilled to have you as part of our organization! Your account is now active and ready to use.
              </p>
              
              <!-- What You Can Do Now -->
              <div style="background-color: #f0fdf4; border-left: 4px solid #10B981; padding: 20px; margin: 25px 0;">
                <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">What You Can Do Now:</h3>
                <ul style="color: #4b5563; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.8;">
                  <li>Access all organization features and resources</li>
                  <li>Connect with team members and collaborators</li>
                  <li>Start using your dashboard and tools</li>
                  <li>Explore our knowledge base and documentation</li>
                </ul>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 35px 0;">
                <a href="{dashboardLink}" style="background-color: #10B981; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block;">
                  Go to My Dashboard
                </a>
              </div>
              
              <p style="color: #6b7280; margin: 25px 0 0 0; font-size: 14px; line-height: 1.6; text-align: center;">
                If you have any questions, our support team is here to help you get started.
              </p>
            </td>
          </tr>
          
          <!-- Tips Section -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="background-color: #f9fafb; border-radius: 6px; padding: 20px;">
                <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 16px;">🚀 Quick Tips:</h3>
                <p style="color: #4b5563; margin: 0 0 10px 0; font-size: 14px; line-height: 1.6;">
                  • Complete your profile to maximize your experience<br>
                  • Check out our <a href="{{guideLink}}" style="color: #10B981; text-decoration: none;">getting started guide</a><br>
                  • Join our community forum to connect with others
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 25px 40px; background-color: #f9fafb; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 13px;">
                Need help? Contact us at <a href="mailto:support@[organization].com" style="color: #10B981; text-decoration: none;">support@[organization].com</a>
              </p>
              <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 13px;">
                Follow us: <a href="{{twitterLink}}" style="color: #10B981; text-decoration: none;">Twitter</a> | 
                <a href="{{linkedinLink}}" style="color: #10B981; text-decoration: none;">LinkedIn</a>
              </p>
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                © 2026 [Organization Name]. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

export const EMAIL_FORGET_PASSWORD_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f4f4; padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff; border-radius:8px; max-width:600px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          
          <tr>
            <td style="padding:30px 40px; background-color:#DC2626; text-align:center; border-radius:8px 8px 0 0;">
              <h1 style="margin:0; color:#ffffff; font-size:24px;">Password Reset Request</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 20px 0; color:#1f2937; font-size:20px;">
                Hello <strong style="color:#DC2626;">{username}</strong>,
              </h2>

              <p style="margin:0 0 18px 0; color:#4b5563; font-size:16px; line-height:1.6;">
                We received a request to reset your password for your account at <strong>[Organization Name]</strong>.
              </p>

              <p style="margin:0 0 18px 0; color:#4b5563; font-size:16px; line-height:1.6;">
                You can reset your password using the button below or by entering the reset token manually.
              </p>

              <div style="text-align:center; margin:30px 0;">
                <a href="{resetLink}" style="background-color:#DC2626; color:#ffffff; text-decoration:none; padding:14px 32px; border-radius:6px; font-size:16px; display:inline-block; font-weight:bold;">
                  Reset My Password
                </a>
              </div>

              <div style="background-color:#fef2f2; border:2px dashed #DC2626; border-radius:6px; padding:20px; text-align:center; margin:25px 0;">
                <p style="margin:0 0 10px 0; color:#6b7280; font-size:14px;">Your Password Reset Token</p>
                <p style="margin:0; color:#1f2937; font-size:30px; font-weight:bold; letter-spacing:2px; font-family:'Courier New', monospace;">
                  {resetToken}
                </p>
              </div>

              <p style="margin:20px 0 0 0; color:#4b5563; font-size:16px; line-height:1.6;">
                This reset token and link will expire in <strong>10 minutes</strong>.
              </p>

              <p style="margin:16px 0 0 0; color:#4b5563; font-size:16px; line-height:1.6;">
                If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
              </p>

              <p style="margin:24px 0 0 0; color:#6b7280; font-size:14px; line-height:1.6; word-break:break-all;">
                Reset link:<br />
                <a href="{{resetLink}}" style="color:#DC2626; text-decoration:none;">{{resetLink}}</a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:25px 40px; background-color:#f9fafb; text-align:center; border-radius:0 0 8px 8px;">
              <p style="margin:0 0 10px 0; color:#6b7280; font-size:13px;">
                Need help? Contact us at
                <a href="mailto:support@organization.com" style="color:#DC2626; text-decoration:none;">support@organization.com</a>
              </p>
              <p style="margin:0; color:#9ca3af; font-size:12px;">
                © 2026 [Organization Name]. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

export const EMAIL_PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset Successful</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f4f4; padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff; border-radius:8px; max-width:600px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">

          <tr>
            <td style="padding:40px 40px 24px; text-align:center; background-color:#ffffff; border-radius:8px 8px 0 0;">
              <div style="width:80px; height:80px; background-color:#10B981; border-radius:50%; display:inline-block; line-height:80px; text-align:center; margin-bottom:20px;">
                <span style="color:#ffffff; font-size:44px; font-weight:bold;">✓</span>
              </div>
              <h1 style="margin:0; color:#111827; font-size:28px;">Password Reset Successful</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 40px 40px;">
              <h2 style="margin:0 0 20px 0; color:#1f2937; font-size:22px;">
                Hello <strong style="color:#10B981;">{username}</strong>,
              </h2>

              <p style="margin:0 0 18px 0; color:#4b5563; font-size:16px; line-height:1.6;">
                This is a confirmation that your password has been changed successfully for your account at <strong>[Organization Name]</strong>.
              </p>

              <p style="margin:0 0 18px 0; color:#4b5563; font-size:16px; line-height:1.6;">
                You can now sign in using your new password.
              </p>

              <div style="background-color:#ecfdf5; border-left:4px solid #10B981; padding:18px 20px; margin:24px 0; border-radius:6px;">
                <p style="margin:0; color:#065f46; font-size:15px; line-height:1.6;">
                  <strong>Security note:</strong> If you made this change, no further action is required.
                </p>
              </div>

              <div style="text-align:center; margin:30px 0;">
                <a href="{loginLink}" style="background-color:#10B981; color:#ffffff; text-decoration:none; padding:14px 32px; border-radius:6px; font-size:16px; font-weight:bold; display:inline-block;">
                  Login to My Account
                </a>
              </div>

              <div style="background-color:#fef2f2; border:1px solid #fecaca; border-radius:6px; padding:18px 20px; margin:24px 0;">
                <p style="margin:0 0 10px 0; color:#991b1b; font-size:15px; font-weight:bold;">
                  Didn’t reset your password?
                </p>
                <p style="margin:0; color:#7f1d1d; font-size:14px; line-height:1.6;">
                  If you did not make this change, please contact support immediately and secure your account.
                </p>
              </div>

              <p style="margin:20px 0 0 0; color:#6b7280; font-size:14px; line-height:1.6; text-align:center;">
                For account safety, this email was sent automatically after a successful password change.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:25px 40px; background-color:#f9fafb; text-align:center; border-radius:0 0 8px 8px;">
              <p style="margin:0 0 10px 0; color:#6b7280; font-size:13px;">
                Need help? Contact us at
                <a href="mailto:support@organization.com" style="color:#10B981; text-decoration:none;">support@organization.com</a>
              </p>
              <p style="margin:0; color:#9ca3af; font-size:12px;">
                © 2026 [Organization Name]. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`