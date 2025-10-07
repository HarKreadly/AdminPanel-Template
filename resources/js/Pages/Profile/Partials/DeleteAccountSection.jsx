import AccordionItem from "./AccordionItem";
import DeleteUserForm from "./DeleteUserForm";

export default function DeleteAccountSection({
    openAccordion,
    toggleAccordion,
}) {
    return (
        <AccordionItem
            id="delete"
            title="Delete Account"
            isOpen={openAccordion.includes("delete")}
            onToggle={toggleAccordion}
            titleClassName="text-red-600 dark:text-red-400 dark:bg-red-900"
            className="bg-red-100 dark:bg-zinc-900"
        >
            <DeleteUserForm className="max-w-xl" />
        </AccordionItem>
    );
}
