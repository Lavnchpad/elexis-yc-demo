def interview_scheduled_template(company_name: str, candidate_name: str, role: str, interview_link: str, scheduled_at: str, interviewer_email: str ):
    subject = f"Your Interview with {company_name} - Complete via the Link Below"
    
    message = f"""Hi {candidate_name},

Thank you for your interest in the {role} at {company_name}.

As the next step in the selection process, we invite you to complete a voice-based AI interview. This interview will help us better understand your experience, communication skills, and overall fit for the role.

🔗 Start your interview by clicking this link: {interview_link}


📆 Scheduled At: {scheduled_at}

Estimated time: 15-20 minutes
Deadline: Please start the interview within half an hour of the scheduled time.

NOTE: Before starting the interview, please check that your mic and camera permissions are enabled by following the setup tutorial below.
https://www.youtube.com/shorts/an_FqfLs3K4

🔒 Important Guidelines:
Please ensure you are in a quiet environment with good lighting and a stable internet connection.

A working microphone and webcam are mandatory.

Your camera must remain on throughout the interview. Turning it off at any point will be automatically flagged and reported to the hiring team.

Ensure you're alone and not reading from notes or screens — proctoring measures (like periodic snapshots, attention tracking, and activity monitoring) are in place to maintain fairness.

If you face any issues while attempting the interview, please feel free to reach out to us at info@amaxatech.com.

Looking forward to hearing from you.

Warm regards,
{company_name}
{interviewer_email}"""
    return subject, message
            