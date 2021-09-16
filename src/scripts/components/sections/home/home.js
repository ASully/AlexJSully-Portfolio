import React from 'react';
import { handleMoveBackground } from '../../../interactivity/background-move';
import { WordCarousel } from '../../../interactivity/word-carousel';
import { createHoverColourWords } from '../../../interactivity/create-hover-words';
import { aaaahhhh } from '../../../interactivity/aaaahhhh';
import './home.css';
import ProfilePic from '../../../../images/me_drawn/profile_pic_drawn.jpg';
import SneezePicStart from '../../../../images/me_drawn/profile_pic_drawn_2.jpg';
import SneezingPic from '../../../../images/me_drawn/profile_pic_drawn_3.jpg';
import SneezingUnsatisfied from '../../../../images/me_drawn/profile_pic_drawn_4.jpg';
// Material-UI
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default class Home extends React.Component {
    constructor() {
        super();

        this.descriptionCarousel = ['Full-Stack Web Developer', 'Data Visualization Programmer', 'Laboratory Researcher', 'Bioinformatician', 'Computational Biologist', 'Scientist', 'Gamer'];

        this.moveBackground = false;
        this.hoveredProfilePic = 0;
        this.sneezeCounter = 0;
        this.aaahhh = false;

        this.state = {
            displayAccessibilityToggles: null
        };
    };

    handleTriggerSneeze() {
        if (!this.aaahhh) {
            this.hoveredProfilePic += 1;

            if (this.hoveredProfilePic % 5 === 0) {
                if (this.sneezeCounter < 5) {
                    document.getElementById('profilePic').src = SneezePicStart;
    
                    setTimeout(() => {
                        document.getElementById('profilePic').src = SneezingPic;
                    }, 500);
        
                    setTimeout(() => {
                        document.getElementById('profilePic').src = SneezingUnsatisfied;
                    }, 800);
        
                    setTimeout(() => {
                        document.getElementById('profilePic').src = ProfilePic;
                    }, 1500);
    
                    this.sneezeCounter += 1;
                } else {
                    this.aaahhh = true;
                    setTimeout(() => {
                        aaaahhhh();
                    }, 2801);
                    
                };
            };
        };
    };

    handleGlobalDyslexia() {
        if (document.getElementById('dyslexia-toggle').checked) {
            document.getElementsByTagName('body')[0].classList.add('dyslexia-global');
        } else {
            document.getElementsByTagName('body')[0].classList.remove('dyslexia-global');
        };
    };

    createAccessibilityToggles() {
        if (!this.state.displayAccessibilityToggles) {
            this.setState({
                displayAccessibilityToggles: (
                    <FormGroup row className="accessibility-toggles">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="dyslexia-toggle"
                                    onChange={() => this.handleGlobalDyslexia()}
                                    color="secondary"
                                />
                            }
                            className="dyslexia-toggle"
                            label="Dyslexic Font"
                            title="Change all font to OpenDyslexic2"
                        />
                    </FormGroup>
                )
            });
        };
    };

    componentDidMount() {
        WordCarousel('description-Carousel', this.descriptionCarousel);
        this.createAccessibilityToggles();
    };

    render() {
        return (
            <div className="home App" id="home" onMouseMove={(e) => handleMoveBackground(e, 'home')} >
                {this.state.displayAccessibilityToggles}
                <img 
                    className="profilePic" id="profilePic" src={ProfilePic} alt="Drawn version of me" loading="lazy" 
                    onMouseEnter={() => this.handleTriggerSneeze()} 
                    onClick={() => this.handleTriggerSneeze()} 
                />
                <h2 className="h2-description">
                    {createHoverColourWords("Alexander Joo-Hyun Sullivan", 'hover-Name')}
                </h2>
                <span id="description-Carousel" className="carousel-description h3-description"></span>
                <h3 className="h3-description" id="no-motion-description" hidden={true}>
                    Full-Stack Web Developer | Bioinformatician | Gamer
                </h3>
            </div>
        );
    }
}