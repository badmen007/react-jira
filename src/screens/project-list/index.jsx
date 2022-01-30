import qs from "qs";
import { useState, useEffect } from "react"
import { cleanObject } from "utils";
import List from "./list"
import { SearchPanel } from "./search-panel"

const apiURL = process.env.REACT_APP_API_URL;
console.log(apiURL)

const ProjectListScreen = () => {

    const [param, setParam] = useState({name:'',personId:''});

    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${apiURL}/users`).then(async response => {
            if(response.ok){
                let result = await response.json()
                setUsers(result);
            }
        })
    }, [param]);

    useEffect(() => {
        fetch(`${apiURL}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
            if(response.ok){
                setList(await response.json());
            }
        })
    },[param])

    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}/>
        <List list={list} users={users} />
    </div>
}

export default ProjectListScreen;