import ProfilePictureAccordion from "./ProfilePictureAccordion";
import AccordionItem from "./AccordionItem";
import UpdateProfileInformationForm from "./UpdateProfileInformationForm";
import UpdateAddressInformationForm from "./UpdateAddressInformationForm";

export default function ProfileSection({ openAccordion, toggleAccordion, mustVerifyEmail, status }) {
    return (
        <>
            {/* Profile Picture Info Accordion */}
            <AccordionItem
                id="profile_picture"
                title="Profile Picture Information"
                isOpen={openAccordion.includes("profile_picture")}
                onToggle={toggleAccordion}
            >
                <ProfilePictureAccordion />
            </AccordionItem>

            {/* Profile Info Accordion */}
            <AccordionItem
                id="profile"
                title="Profile Information"
                isOpen={openAccordion.includes("profile")}
                onToggle={toggleAccordion}
            >
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-7xl"
                />
            </AccordionItem>

            {/* Addresses Info Accordion */}
            <AccordionItem
                id="adresses"
                title="Addresses Information"
                isOpen={openAccordion.includes("adresses")}
                onToggle={toggleAccordion}
            >
                <UpdateAddressInformationForm className="max-w-7xl" />
            </AccordionItem>
        </>
    );
}
