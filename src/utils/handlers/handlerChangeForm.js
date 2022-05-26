export default function handlerChangeForm(event, setState, state){
    const {target} = event
        const {value, name} = target
        const newValues = {
            ...state,
            [name] : value
        }
        setState(newValues)
}