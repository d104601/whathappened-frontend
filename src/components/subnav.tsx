import {ReactNode, SyntheticEvent, useState} from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import newsSearch from "../services/newsSearch";

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const Subnav = () => {
    // 2 tabs: Search and Saved
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="News Search" {...a11yProps(0)} />
                    <Tab label="Saved Articles" {...a11yProps(1)} />
                    <Tab label="Summarize with GPT" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {newsSearch()}
            </TabPanel>
            <TabPanel value={value} index={1}>
                Saved Articles(Coming soon)
            </TabPanel>
            <TabPanel value={value} index={2}>
                Summarize with GPT(Coming soon)
            </TabPanel>
        </Box>
    );
}

export default Subnav;