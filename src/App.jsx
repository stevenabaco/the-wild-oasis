import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

function App() {
	const StyledApp = styled.main`
		background-color: orangered;
		padding: 20px;
	`;

	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Heading as="h1">Hello World</Heading>
				<Heading as="h2">Check in and out</Heading>
				<Button onClick={() => alert("Check In")}>Check in</Button>
				<Button onClick={() => alert("Check Out")}>Check in</Button>
				<Heading as="h3">Form</Heading>
				<Input
					type="number"
					placeholder="Number of quests"
				></Input>
			</StyledApp>
		</>
	);
}

export default App;
