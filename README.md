<h1 align="center">
    <img src="https://raw.githubusercontent.com/fullmetal1/Cyberia/master/logo.jpg" alt="Cyberia logo" />
</h1># Introduction

## About

This is a Work in Progress.

Cyberia is a fully decentralized webapp for publishing and subscribing to content.

## How it *WILL* work

The idea is to make use of ipfs primaries and some basic json documents to store relevent information necessary to publish, subscribe, and download files in a completely distributed, peer to peer way. 

## Rough Protocol Description

IPFS provides a service called IPNS, which is a multiaddress that points to a file published by the node with the corresponding keying information. In Cyberia each IPNS address will be considered a 'repository' Each repository will be a JSON file listing other repositories and/or IPFS multihash addresses (files). Users can make new repositories (new IPFS keying information), and add files to their repositories (which will simply add the IPFS hash to the JSON list). Users will also be able to subscribe to repositories by adding their IPNS hash, which will download the listed repositories, and worm their way through each repo to the files contained. Once basic functionality is finished, advanced features such as automated downloading based on string matching/regex/whatever really will be added.

## Diagramatic Heirarchy

### Generic

                      User
                       |
               Identity(repository)
               /        |   ...   \
      repository    repository repository
      /       \         |         |
    file repository    ...       ...
         /    | ... \
        file file file

### Example

                    SubGroup
                       |
                Identity(repository)
                /            |  ...  \
            Series         Series   Series
          /        \         |        |
    credits       Season1    ...      ...
              /     | ... \
       Episode1 Episode2 Episode3

# Roadmap

First step is to finish all primaries (creating ipfs nodes, storing and loading profile information, file uploading and downloading, JSON parsing (especially loop detection), updating IPNS content).

The next step is to beautify the interface for usability (creating menus and interfaces for all basic functionality).

The third step is to add other desireable functionality (file searching, preemptive subscribing, tags, titles and descriptions for files/repos, previews where applicable, and anything else I think of along the way).

# License

Cyberia is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>.

# Credits

So far just yours truly. 

If you want to add your name to the list above please feel free to send a pull request.
