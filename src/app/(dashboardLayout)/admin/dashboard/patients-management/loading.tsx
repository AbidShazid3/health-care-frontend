import { ManagementPageLoading } from '@/components/shared/ManagementPageLoader';

const PatientManagementLoading = () => {
    return (
        <ManagementPageLoading
                                columns={10}
                                hasActionButton
                                filterCount={5}
                                filterWidths={["w-48", "w-40", "w-36", "w-32", "w-24"]}
                            />
    );
};

export default PatientManagementLoading;