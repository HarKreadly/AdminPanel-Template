import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";

export default function UpdateAddressInformationForm({ className = "" }) {
    const user = usePage().props.auth.user;

    const initialData = {
        country: user.country || "",
        city: user.city || "",
        province: user.province || "",
        address: user.address || "",
        zip_code: user.zip_code || "",
        time_zone: user.time_zone || "",
    };

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm(initialData);

    // Check if form data has changed
    const hasChanges = JSON.stringify(data) !== JSON.stringify(initialData);

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.address.update"), {
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                    Address Information
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Update your address and location details.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Location Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="country" value="Country" />
                        <select
                            id="country"
                            className="mt-1 rounded-md bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 border-gray-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 block w-full p-2.5"
                            value={data.country}
                            onChange={(e) => setData("country", e.target.value)}
                        >
                            <option value="">Select Country</option>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                            <option value="Spain">Spain</option>
                            <option value="Italy">Italy</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Austria">Austria</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Norway">Norway</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Finland">Finland</option>
                            <option value="Poland">Poland</option>
                            <option value="Czech Republic">Czech Republic</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Greece">Greece</option>
                            <option value="Japan">Japan</option>
                            <option value="South Korea">South Korea</option>
                            <option value="China">China</option>
                            <option value="India">India</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Chile">Chile</option>
                            <option value="Colombia">Colombia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Egypt">Egypt</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Morocco">Morocco</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Israel">Israel</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Russia">Russia</option>
                            <option value="Ukraine">Ukraine</option>
                        </select>
                        <InputError className="mt-2" message={errors.country} />
                    </div>

                    <div>
                        <InputLabel htmlFor="city" value="City" />
                        <TextInput
                            id="city"
                            className="mt-1 block w-full"
                            value={data.city}
                            onChange={(e) => setData("city", e.target.value)}
                            autoComplete="address-level2"
                            placeholder="Input your city"
                        />
                        <InputError className="mt-2" message={errors.city} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="province" value="Province/State" />
                        <TextInput
                            id="province"
                            className="mt-1 block w-full"
                            value={data.province}
                            onChange={(e) => setData("province", e.target.value)}
                            autoComplete="address-level1"
                            placeholder="Input your Province/State"
                        />
                        <InputError className="mt-2" message={errors.province} />
                    </div>

                    <div>
                        <InputLabel htmlFor="address" value="Address" />
                        <TextInput
                            id="address"
                            className="mt-1 block w-full"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            autoComplete="street-address"
                            placeholder="Input your address"
                        />
                        <InputError className="mt-2" message={errors.address} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="zip_code" value="Zip Code" />
                        <TextInput
                            id="zip_code"
                            className="mt-1 block w-full"
                            value={data.zip_code}
                            onChange={(e) => setData("zip_code", e.target.value)}
                            autoComplete="postal-code"
                            placeholder="Input your zip code"
                        />
                        <InputError className="mt-2" message={errors.zip_code} />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <InputLabel htmlFor="time_zone" value="Timezone" />
                            <button
                                type="button"
                                onClick={() => {
                                    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                                    setData("time_zone", detectedTimezone);
                                }}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Auto-detect
                            </button>
                        </div>
                        <select
                            id="time_zone"
                            className="mt-1 block w-full border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 rounded-md shadow-sm"
                            value={data.time_zone}
                            onChange={(e) => setData("time_zone", e.target.value)}
                        >
                            <option value="">Select timezone</option>
                            <optgroup label="Common Timezones">
                                <option value="UTC">UTC (Coordinated Universal Time)</option>
                                <option value="America/New_York">Eastern Time (US & Canada)</option>
                                <option value="America/Chicago">Central Time (US & Canada)</option>
                                <option value="America/Denver">Mountain Time (US & Canada)</option>
                                <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                                <option value="America/Anchorage">Alaska</option>
                                <option value="Pacific/Honolulu">Hawaii</option>
                                <option value="Europe/London">London</option>
                                <option value="Europe/Paris">Paris, Berlin, Rome</option>
                                <option value="Europe/Athens">Athens, Istanbul</option>
                                <option value="Europe/Moscow">Moscow</option>
                                <option value="Asia/Dubai">Dubai</option>
                                <option value="Asia/Karachi">Karachi</option>
                                <option value="Asia/Kolkata">Mumbai, Kolkata, New Delhi</option>
                                <option value="Asia/Dhaka">Dhaka</option>
                                <option value="Asia/Bangkok">Bangkok, Jakarta</option>
                                <option value="Asia/Singapore">Singapore</option>
                                <option value="Asia/Hong_Kong">Hong Kong, Beijing</option>
                                <option value="Asia/Tokyo">Tokyo, Osaka</option>
                                <option value="Australia/Sydney">Sydney, Melbourne</option>
                                <option value="Pacific/Auckland">Auckland</option>
                            </optgroup>
                            <optgroup label="Americas">
                                <option value="America/Argentina/Buenos_Aires">Buenos Aires</option>
                                <option value="America/Bogota">Bogota</option>
                                <option value="America/Caracas">Caracas</option>
                                <option value="America/Lima">Lima</option>
                                <option value="America/Mexico_City">Mexico City</option>
                                <option value="America/Santiago">Santiago</option>
                                <option value="America/Sao_Paulo">São Paulo</option>
                                <option value="America/Toronto">Toronto</option>
                            </optgroup>
                            <optgroup label="Europe">
                                <option value="Europe/Amsterdam">Amsterdam</option>
                                <option value="Europe/Brussels">Brussels</option>
                                <option value="Europe/Dublin">Dublin</option>
                                <option value="Europe/Lisbon">Lisbon</option>
                                <option value="Europe/Madrid">Madrid</option>
                                <option value="Europe/Stockholm">Stockholm</option>
                                <option value="Europe/Vienna">Vienna</option>
                                <option value="Europe/Warsaw">Warsaw</option>
                                <option value="Europe/Zurich">Zurich</option>
                            </optgroup>
                            <optgroup label="Asia">
                                <option value="Asia/Baghdad">Baghdad</option>
                                <option value="Asia/Baku">Baku</option>
                                <option value="Asia/Jerusalem">Jerusalem</option>
                                <option value="Asia/Kuwait">Kuwait</option>
                                <option value="Asia/Manila">Manila</option>
                                <option value="Asia/Riyadh">Riyadh</option>
                                <option value="Asia/Seoul">Seoul</option>
                                <option value="Asia/Shanghai">Shanghai</option>
                                <option value="Asia/Taipei">Taipei</option>
                                <option value="Asia/Tehran">Tehran</option>
                            </optgroup>
                            <optgroup label="Africa">
                                <option value="Africa/Cairo">Cairo</option>
                                <option value="Africa/Johannesburg">Johannesburg</option>
                                <option value="Africa/Lagos">Lagos</option>
                                <option value="Africa/Nairobi">Nairobi</option>
                            </optgroup>
                            <optgroup label="Australia & Pacific">
                                <option value="Australia/Adelaide">Adelaide</option>
                                <option value="Australia/Brisbane">Brisbane</option>
                                <option value="Australia/Perth">Perth</option>
                                <option value="Pacific/Fiji">Fiji</option>
                                <option value="Pacific/Guam">Guam</option>
                            </optgroup>
                        </select>
                        <InputError className="mt-2" message={errors.time_zone} />
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing || !hasChanges}>
                        Save
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 dark:text-green-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}