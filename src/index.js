/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
/**
 * WordPress dependencies
 */
import '@wordpress/core-data';
import '@wordpress/notices';
import '@wordpress/block-editor';
import {
	registerBlockType,
	unstable__bootstrapServerSideBlockDefinitions, // eslint-disable-line camelcase
} from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

import 'jquery';
import '../node_modules/ucla-bruin-components/public/css/ucla-lib.min.css';

/**
 * Internal dependencies
 */
import * as accordion from './accordion';
import * as button from './button';
import * as card from './card';
import * as carousel from './carousel';
import * as eventCard from './event-card';
import * as factoid from './factoid';
import * as hero from './hero';
import * as profileCard from './profile-card';
import * as ranking from './ranking';
import * as statistic from './statistic';
import * as storyCard from './story-card';
import * as tabs from './tabs';
import * as tile from './tile';

/**
 *
 * @param {Object} block The block to be registered.
 */
const registerBlock = ( block ) => {
	if ( ! block ) {
		return;
	}
	const { metadata, settings, name } = block;
	if ( metadata ) {
		unstable__bootstrapServerSideBlockDefinitions( { [ name ]: metadata } );
	}
	registerBlockType( name, settings );
};

/**
 * Function to register blocks into the block editor.
 */
export const registerUwaiBlocks = () => {
	[
		// Common blocks are grouped at the top to prioritize their display
		// in various contexts — like the inserter and auto-complete components.
		accordion,
		button,
		card,
		carousel,
		eventCard,
		factoid,
		profileCard,
		hero,
		ranking,
		statistic,
		storyCard,
		tabs,
		tile,
	].forEach( registerBlock );
};

registerUwaiBlocks();
