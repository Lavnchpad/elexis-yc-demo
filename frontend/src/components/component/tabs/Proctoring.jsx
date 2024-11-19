import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Proctoring = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-left">
          Tell me a bit about your experience with leading cross-functional teams. 
          What are some key strategies you've used to effectively manage and motivate diverse teams?
        </AccordionTrigger>
        <AccordionContent>
          I’ve managed multiple projects where I coordinated between project managers, engineers, and leadership. 
          My key strategies include creating clear documentation, fostering a culture of feedback, 
          and using tools to ensure transparency.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger className="text-left">
          Can you give a specific example of a cross-functional project you led? 
          What were the key challenges you faced, and how did you overcome them?
        </AccordionTrigger>
        <AccordionContent>
          In a project to automate Jira ticket assignment, I worked closely with product owners and the ML team. 
          The biggest challenge was building trust in the AI system's accuracy. 
          We addressed this by running UAT tests and allowing manual overrides, 
          which enhanced the system’s reliability.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          How did you handle a conflict between teams with differing priorities?
        </AccordionTrigger>
        <AccordionContent>
          In one project, the dev team wanted more time for thorough testing, while the business owners wanted a quick release. 
          I negotiated a phased release plan, explaining the long-term risks of rushing. 
          This approach satisfied both parties by aligning goals.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>
          Can you explain how automation improved your project timelines?
        </AccordionTrigger>
        <AccordionContent>
          By implementing an Azure DevOps CI/CD pipeline, we saved two days per sprint. 
          Automated unit and integration tests reduced manual testing effort by 75% 
          and caught critical bugs before release, preventing costly production fixes.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>
          How do you measure the impact of your solutions?
        </AccordionTrigger>
        <AccordionContent>
          For an AI-driven Jira assignment tool, we measured success through ticket resolution time, which improved by 10%, 
          and accuracy of assignments, which saw fewer overrides.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6">
        <AccordionTrigger>
          Describe a time you managed a global project and overcame communication challenges.
        </AccordionTrigger>
        <AccordionContent>
          I worked on a global commerce application integrating marketing, logistics, and ERP systems. 
          Clear documentation and assigning a product owner were key strategies to ensure alignment and address any conflicts.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Proctoring;
