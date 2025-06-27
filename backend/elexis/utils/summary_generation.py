import json
import os

import dotenv
import google.generativeai as genai
from google.generativeai.types import BlobDict
import logging
import requests
from io import BytesIO
logger = logging.getLogger(__name__)


dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI"))


def generate_summary_data(data, requirements):
    prompt_template = '''
        As a senior recruiter, create a detailed and comprehensive summary of the candidate from the transcription of the interview conversation. This summary will help hiring managers understand the candidate's suitability for the position based on various criteria. Include relevant examples and provide ratings for each section. The summary should encompass the following sections: overall impression, strengths (with examples and ratings), areas for improvement (with suggestions), final recommendation and requirements evaluation.
        
        I want you to be give critical reviews.
        
        Transcription:
        {{data}}

        Return the summary as a JSON object with these keys: 'overall_impression', 'strengths', 'areas_for_improvement','skills' , 'experience' , 'final_recommendation' and 'requirements_evaluation'.

        Each section should contain the following information:

        overall_impression: (List of Strings) List of points summarizing the general impression of the candidate, including communication skills, demeanor, and fit for the company culture.

        strengths: Each item should be a dictionary with the following fields:
        strength: The specific strength of the candidate
        example: An example or situation demonstrating this strength
        rating: A rating out of 5, where 5 indicates excellent proficiency

        areas_for_improvement: Each item should be a dictionary with the following fields:
        area: The specific area needing improvement
        details: A detailed explanation of the area
        suggestions: Suggestions questions that can be asked on how the candidate can improve in this area or recommendations for further assessments during interviews in a paragraph

        skills: It should be an list of Dictionary and each item should be a dictionary with the following fields:
        and example object of skills should look like this: 
            [
              {
                title: "Languages",
                skills: [
                  { name: "C++", rating: 5 },
                ],
              },
              {
                title: "Job Related Skills",
                skills: [
                  { name: "Frontend Dev.", rating: 5 },
                  { name: "Backend Dev.", rating: 5 },
                ],
              },
            ]
        experience: It should be a list of dictionary based on the professional work experience of the candidate and each item should include name , years and months

        final_recommendation: (List of Strings) List of points summarizing the overall recommendation regarding the candidate's potential fit for the position, including any conditions or next steps. Ensure the summary is clear, concise, and provides a holistic view of the candidate's capabilities, potential, and areas needing improvement.

        requirements_evaluation: Given the list of job requirements: {{requirements}}, evaluate a candidate against each listed requirement.

                For each requirement, return a dictionary that includes:

                All the existing fields from the input

                An additional field called evaluation (an integer between 1 and 100)

                A remarks field providing a short qualitative assessment for that requirement

                The final output should be a list of dictionaries, one per requirement, with the added evaluation and remarks fields.
        '''
    while True:
        try:
            prompt = prompt_template.replace("{{data}}", data).replace("{{requirements}}", str(requirements))
            model = genai.GenerativeModel('gemini-2.0-flash',
                                          generation_config={"response_mime_type": "application/json"})
            chat = model.start_chat(history=[])
            response = chat.send_message(prompt)

            response_json = json.loads(response.text)
            required_keys = [
                'overall_impression',
                'strengths',
                'areas_for_improvement',
                'final_recommendation',
                'skills',
                'experience',
                'requirements_evaluation'
            ]

            for key in required_keys:
                assert key in response_json, f"Missing key in the response: {key}"
                assert isinstance(response_json[key],
                                    list), f"Key '{key}' should be a list but got {type(response_json[key])}"

            for item in response_json['strengths']:
                assert 'strength' in item, "Missing 'strength' in strengths"
                assert 'example' in item, "Missing 'example' in strengths"
                assert 'rating' in item, "Missing 'rating' in strengths"

            for item in response_json['areas_for_improvement']:
                assert 'area' in item, "Missing 'area' in areas_for_improvement"
                assert 'details' in item, "Missing 'details' in areas_for_improvement"
                assert 'suggestions' in item, "Missing 'suggestions' in areas_for_improvement"

            return response_json

        except AssertionError as e:
            print(f"Assertion Error: {e}")

            correction_prompt = (
                f"There was an error in the format of the JSON response: {e}. Please ensure the response has the following structure:\n\n"
                f"1. 'overall_impression' should be an array of points.\n"
                f"2. 'strengths' should be an array of dictionaries, each with 'strength', 'example', and 'rating'.\n"
                f"3. 'areas of potential discussion' should be an array of dictionaries, each with 'area', 'details', and 'suggestions'.\n"
                f"4. 'final_recommendation' should be an array of points.\n\n"
                f"Please correct and reformat the response accordingly."
            )
            prompt_template = correction_prompt
            continue

        except Exception as e:
            print(e)
            return None



def generate_summary(transcript_data, requirements): # requirements stands for JobRequirement Table
    logger.info("Summary Function started")
    try:
        summary_data = generate_summary_data(transcript_data, requirements)
        logger.info("File processing completed successfully")

        return summary_data

    except Exception as e:
        logger.error(f"An error occurred while processing the file: {e}")
        return {"status": "error", "message": str(e)}





def experience_information_generation(signed_url):
    response = requests.get(signed_url)
    if response.status_code != 200:
        logger.error("Failed to download file from signed URL")
        return None

    pdf_blob = BlobDict(data=response.content, mime_type="application/pdf")

    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        prompt = (
            "You are an expert recruiter. Extract and summarize the candidate's professional work experience from the attached PDF resume. "
            "For each experience, provide the company name, duration in years (as an integer), and duration in months (as an integer, 0-11). "
            "Return the result as a JSON list of dictionaries, each with keys: name, years, months. "
            "Example: [{\"name\": \"CompanyX\", \"years\": 2, \"months\": 5}]. "
            "Do not return as markdown, return as plain JSON."
        )
        response = model.generate_content(
            [prompt, pdf_blob],
            stream=False,
            generation_config={
                "response_mime_type": "application/json",
            }
        )
        return json.loads(response.text)
    except Exception as e:
        logger.error(f"Error extracting experience: {e}")
        return None


def resume_summary_generator(signed_url):
    response = requests.get(signed_url)
    if response.status_code != 200:
        logger.error("Failed to download file from signed URL")
        return None

    pdf_blob = BlobDict(data=response.content, mime_type="application/pdf")

    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        prompt = (
            "You are an expert recruiter. Summarize the candidate's resume from the attached PDF. "
            "The summary should include key skills, experiences, and qualifications relevant to the job role. "
            "Return the summary as a JSON object with keys: 'skills', 'experience', 'qualifications'. "
            "Do not return as markdown, return as plain JSON."
        )
        response = model.generate_content(
            [prompt, pdf_blob],
            stream=False,
            generation_config={
                "response_mime_type": "application/json",
            }
        )
        return json.loads(response.text)
    except Exception as e:
        logger.error(f"Error generating resume summary: {e}")
        return None