import { useSelector } from "react-redux"
import ContentTabBtn from "./shared/ContentTabBtn";

export default function ContentNav() {

    const tabs = useSelector(state => state.content.tabs) || [];
    const openedTabs = useSelector(state => state.content.openedTabs);

    const getopenedTabs = () => (
        tabs.map((eachTab, idx) => (
            <ContentTabBtn 
                key={eachTab.id}
                onClick={() => console.log(eachTab, ' Clicked')}
                onClose={() => console.log(eachTab, ' Closed')}
                label={eachTab.label}
                currentTab={openedTabs.currentContent?.data?.id === eachTab.id || false}
            />
        ))
    )

    return (
        <div
            style={{
                display: 'flex',
            }}
            id="contentNav"
        >
            {getopenedTabs()}
        </div>
    )
}