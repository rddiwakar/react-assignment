import styled from "styled-components";
const TitleStyle = styled.div`
font-size:1.2rem;
padding: 1.5rem;
border:1px solid rgb(230, 230, 230);
.titlevalue{
    font-weight:700
}
`
const Title = ({ titleName, titleValue }) => {
    const value = titleName === 'Web' ? <a href={titleValue} target="_blank" style={{color:"black"}} >{titleValue}</a>: titleValue
    return (
        <TitleStyle>
            <span>{titleName}:</span> <span className='titlevalue'>{value}</span>
        </TitleStyle>
    )
}
export default Title;