import AccordionItem from "./AccordionItem";
import UpdatePasswordForm from "./UpdatePasswordForm";

export default function PasswordSection({ openAccordion, toggleAccordion }) {
    return (
        <AccordionItem
            id="password"
            title="Update Password"
            isOpen={openAccordion.includes("password")}
            onToggle={toggleAccordion}
        >
            <UpdatePasswordForm className="max-w-xl" />
        </AccordionItem>
    );
}
