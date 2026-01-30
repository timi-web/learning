interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  console.info("[Nebula Lite] Email sent", {
    to: options.to,
    subject: options.subject
  });
}

export function obligationDueEmail(data: {
  recipientName: string;
  obligationTitle: string;
  projectName: string;
  dueDate: string;
  daysUntilDue: number;
  link: string;
}): EmailOptions {
  return {
    to: data.recipientName,
    subject: `[${data.projectName}] Obligation due in ${data.daysUntilDue} days: ${data.obligationTitle}`,
    html: `
      <h2>Obligation Reminder</h2>
      <p>The following obligation is due in <strong>${data.daysUntilDue} days</strong>:</p>
      <p><strong>${data.obligationTitle}</strong></p>
      <p>Project: ${data.projectName}</p>
      <p>Due Date: ${data.dueDate}</p>
      <a href="${data.link}" style="display:inline-block;padding:12px 24px;background:#1a365d;color:white;text-decoration:none;border-radius:4px;">View Obligation</a>
    `
  };
}

export function breachNotificationEmail(data: {
  projectName: string;
  obligationTitle: string;
  breachedParty: string;
  link: string;
}): EmailOptions {
  return {
    to: data.breachedParty,
    subject: `[BREACH] ${data.projectName}: ${data.obligationTitle}`,
    html: `
      <h2 style="color:#e53e3e;">Breach Notification</h2>
      <p>An obligation has been marked as <strong>BREACHED</strong>:</p>
      <p><strong>${data.obligationTitle}</strong></p>
      <p>Project: ${data.projectName}</p>
      <p>This breach has been recorded on the blockchain as immutable evidence.</p>
      <a href="${data.link}" style="display:inline-block;padding:12px 24px;background:#e53e3e;color:white;text-decoration:none;border-radius:4px;">View Details</a>
    `
  };
}
