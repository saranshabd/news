import React, { Component } from "react";
import { Form, Button, List } from "semantic-ui-react";
import axios from "axios";

class News extends Component {
    state = {
        // top news sources
        sources: [],

        // parameters
        category: null,
        country: null,
        k: 0,

        // API response received flag
        done: true,
    };

    fetchNewsSources = () => {
        this.setState({ done: false });

        const category = this.state.category;
        const country = this.state.country;
        const k = this.state.k;

        if (!category && !country) {
            // no parameters
            this.fetchNewsSourcesHelper(
                `${process.env.REACT_APP_URL}/api/news/sources/top?k=${k}`
            );
        } else if (!category) {
            // just `country`
            this.fetchNewsSourcesHelper(
                `${process.env.REACT_APP_URL}/api/news/sources/top?country=${country}&k=${k}`
            );
        } else if (!country) {
            // just `category`
            this.fetchNewsSourcesHelper(
                `${process.env.REACT_APP_URL}/api/news/sources/top?category=${category}&k=${k}`
            );
        } else {
            // all parameters
            this.fetchNewsSourcesHelper(
                `${process.env.REACT_APP_URL}/api/news/sources/top?country=${country}&category=${category}&k=${k}`
            );
        }
    };

    fetchNewsSourcesHelper = (url) => {
        axios
            .get(url)
            .then((response) => {
                console.log(response);
                this.setState({ sources: response.data.top });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ sources: [] });
            })
            .finally(() => this.setState({ done: true }));
    };

    render() {
        return (
            <div>
                <Form>
                    <Form.Field>
                        <label>Category</label>
                        <input
                            value={this.state.category}
                            onChange={(e) =>
                                this.setState({ category: e.target.value })
                            }
                            placeholder="e.g. technology, entertainment, etc"
                            required={false}
                            type="text"
                            disabled={!this.state.done}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Country</label>
                        <input
                            value={this.state.country}
                            onChange={(e) =>
                                this.setState({ country: e.target.value })
                            }
                            placeholder="e.g. us, in, etc"
                            required={false}
                            type="text"
                            disabled={!this.state.done}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>
                            Maximum number of records <br />
                            <span style={{ color: "red" }}>*required</span>
                        </label>
                        <input
                            value={this.state.k}
                            onChange={(e) =>
                                this.setState({ k: e.target.value })
                            }
                            placeholder="e.g. 10, 12, 23, etc"
                            required={true}
                            type="number"
                            disabled={!this.state.done}
                        />
                    </Form.Field>
                    <center>
                        <br />
                        <br />
                        <Button
                            type="submit"
                            onClick={this.fetchNewsSources}
                            disabled={!this.state.done}
                        >
                            Fetch Top News Sources
                        </Button>
                    </center>
                </Form>
                <br />
                <br />
                <center>
                    <br />
                    <div style={{ maxWidth: 400 }}>
                        <List divided relaxed>
                            {this.state.sources.map((value, _) => {
                                return (
                                    <List.Item>
                                        <List.Content>
                                            <List.Header as="p">
                                                {value}
                                            </List.Header>
                                        </List.Content>
                                    </List.Item>
                                );
                            })}
                        </List>
                    </div>
                </center>
            </div>
        );
    }
}

export default News;
