import AccordionItem from "./AccordionItem";
import UpdatePasswordForm from "./UpdatePasswordForm";

export default function PasswordSection({ openAccordion, toggleAccordion }) {
    return (
        <AccordionItem
            id="security"
            title="Update Password"
            isOpen={openAccordion.includes("security")}
            onToggle={toggleAccordion}
        >
            <UpdatePasswordForm className="max-w-xl" />
        </AccordionItem>
    );
}
