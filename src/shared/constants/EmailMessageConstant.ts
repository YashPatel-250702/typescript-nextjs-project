export function AdminEmailMessage(name: string): string {
  return `<div style="font-family: Arial, sans-serif; color: #333;">
                <h1 style="color: #1e88e5;">Welcome to Mufasa! 🦁</h1>
                <p>Hi ${name},</p>
                <p>We're excited to welcome you to <strong>Mufasa – Teams and Player Management System</strong>!</p>
                <p>Your registration was successful, and you're now ready to start managing teams and players with ease.</p>
                <p>As part of the Mufasa platform, you can now:</p>
                <ul>
                  <li>Create and manage your teams</li>
                  <li>Add, edit, or remove players</li>
                  <li>Assign players to specific teams</li>
                  <li>Track player stats and performance</li>
                  <li>Maintain an organized and efficient team structure</li>
                </ul>
                <p>If you have any questions or need help getting started, feel free to reach out to our support team.</p>
                <p>Thank you for choosing Mufasa. Let's build great teams together!</p>
                <br/>
                <p>Best regards,<br/><strong>The Mufasa Team</strong></p>
              </div>
              `;
}

export function NormalUserMailMessage(name: string): string {
  return `<div style="font-family: Arial, sans-serif; color: #333;">
  <h1 style="color: #1e88e5;">Welcome to Mufasa! 🦁</h1>
  <p>Hi ${name},</p>
  <p>Welcome to <strong>Mufasa – Teams and Player Management System</strong>!</p>
  <p>Your registration was successful, and you're now part of a platform designed to keep teams and player data organized and accessible.</p>
  <p>As a valued member of Mufasa, you can now:</p>
  <ul>
    <li>View team profiles and structures</li>
    <li>Browse player profiles and stats</li>
    <li>Stay updated on team performance and changes</li>
  </ul>
  <p>While you won't be able to make changes, your access ensures you're always in the loop with the latest team and player information.</p>
  <p>If you have any questions or need assistance, feel free to contact our support team at any time.</p>
  <p>Thank you for being part of Mufasa. Enjoy exploring!</p>
  <br/>
  <p>Best regards,<br/><strong>The Mufasa Team</strong></p>
</div>
`;
}
