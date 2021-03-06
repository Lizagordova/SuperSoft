﻿import React from "react";
import {IUsersProps} from "./IUsersProps";
import {makeObservable, observable} from "mobx";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import {Alert} from "react-bootstrap";
import {Role} from "../../Typings/enums/Role";
import {observer} from "mobx-react";
import {UserReadModel} from "../../Typings/viewModels/UserReadModel";
import {translateRole} from "../../functions/translater";

@observer
export class AddUser extends React.Component<IUsersProps>{
    addUserWindowOpen: boolean;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleDropdownOpen: boolean;
    role: Role;
    notSaved: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            addUserWindowOpen: observable,
            roleDropdownOpen: observable
        });
        this.role = Role.Developer;
    }

    isAuthor(role: Role) {
        return role === Role.Administrator;
    }

    toggleAddUserWindow() {
        this.addUserWindowOpen = !this.addUserWindowOpen;
    }

    toggleRoleDropdown() {
        this.roleDropdownOpen = !this.roleDropdownOpen;
    }

    renderButton() {
        return(
            <>
                <div className="col-6">
                    <Button
                        style={{backgroundColor: "#66A5AD", width: "100%"}}
                        onClick={() => this.toggleAddUserWindow()}>Добавить пользователя</Button>
                </div>
            </>
        );
    }

    renderRoleDropdown() {
        return(
            <Dropdown isOpen={this.roleDropdownOpen} toggle={() => this.toggleRoleDropdown()}>
                <DropdownToggle tag="a" className="nav-link" caret>{translateRole(this.role)}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => this.chooseRole(Role.Developer)}>{translateRole(Role.Developer)}</DropdownItem>
                    <DropdownItem onClick={() => this.chooseRole(Role.Administrator)}>{translateRole(Role.Administrator)}</DropdownItem>
                    <DropdownItem onClick={() => this.chooseRole(Role.Tester)}>{translateRole(Role.Tester)}</DropdownItem>
                    <DropdownItem onClick={() => this.chooseRole(Role.Accounter)}>{translateRole(Role.Accounter)}</DropdownItem>
                    <DropdownItem onClick={() => this.chooseRole(Role.Marketolog)}>{translateRole(Role.Marketolog)}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderAddUserWindow() {
        return(
            <Modal
                isOpen={this.addUserWindowOpen}
                toggle={() => this.toggleAddUserWindow()}>
                <i className="fa fa-window-close cool-close-button" aria-hidden="true"
                onClick={() => this.toggleAddUserWindow()}/>
                {this.notSaved && <Alert color="danger">Что-то пошло не так и пользователь не сохранился!</Alert>}
                <ModalHeader closeButton>ДОБАВЛЕНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ</ModalHeader>
                <ModalBody>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Label>Имя</Label>
                            <Input onChange={(e) => this.inputFirstName(e)}/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Label>Фамилия</Label>
                            <Input onChange={(e) => this.inputLastName(e)}/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <Label>Email</Label>
                            <Input onChange={(e) => this.inputEmail(e)}/>
                        </div>
                        {this.isAuthor(this.props.store.userStore.currentUser?.role) &&
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <Label>Password</Label>
                                <Input onChange={(e) => this.inputPassword(e)}/>
                            </div>
                        }
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            {this.renderRoleDropdown()}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        style={{backgroundColor: "#66A5AD", width: "100%"}}
                        onClick={() => this.saveUser()}>
                        СОХРАНИТЬ
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

    render() {
        return(
            <>
                {this.addUserWindowOpen && this.renderAddUserWindow()}
                {!this.addUserWindowOpen && this.renderButton()}
            </>
        );
    }

    inputFirstName(event: React.FormEvent<HTMLInputElement>): void {
        this.firstName = event.currentTarget.value;
    }

    inputLastName(event: React.FormEvent<HTMLInputElement>): void {
        this.lastName = event.currentTarget.value;
    }

    inputEmail(event: React.FormEvent<HTMLInputElement>): void {
        this.email = event.currentTarget.value;
    }

    inputPassword(event: React.FormEvent<HTMLInputElement>): void {
        this.password = event.currentTarget.value;
    }

    chooseRole(role: Role) {
        this.role = role;
    }

    saveUser() {
        let user = new UserReadModel();
        user.firstName = this.firstName;
        user.lastName = this.lastName;
        user.email = this.email;
        user.role = this.role;
        user.password = this.password;
        this.props.store.userStore.addOrUpdateUser(user)
            .then(status => {
                if(status !== 200) {
                    this.notSaved = true;
                } else {
                    this.notSaved = false;
                    this.addUserWindowOpen = false;
                }
            });
    }
}