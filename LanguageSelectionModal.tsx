import React, { FC, useCallback } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import useBLE from "./useBLE";



type LanguageModalListItemProps = {
  item: ListRenderItemInfo<string>;
  selectLanguage: (language: string) => void;
  closeModal: () => void;
};

type LanguageModalProps = {
  languages: string[];
  visible: boolean;
  selectLanguage: (language: string) => void;
  closeModal: () => void;
};

const LanguageModalListItem: FC<LanguageModalListItemProps> = (props) => {
    const {
        sendTextToDevice
      } = useBLE();
  const { item, selectLanguage, closeModal } = props;

  const selectAndCloseModal = useCallback(() => {
    // selectLanguage(item.item);
    sendTextToDevice({language: item.item})
    
    // closeModal();
    
  }, []);

  return (
    <TouchableOpacity
      onPress={selectAndCloseModal}
      style={modalStyle.ctaButton}
    >
      <Text style={modalStyle.ctaButtonText}>{item.item}</Text>
    </TouchableOpacity>
  );
};

const LanguageModal: FC<LanguageModalProps> = (props) => {
    
    const { visible, selectLanguage, closeModal } = props;
  
    // Static list of languages
    const languages = ["Cantonese", "English", "Hungarian","Spanish"];
  
    const renderLanguageModalListItem = useCallback(
      (item: ListRenderItemInfo<string>) => {
        return (
          <LanguageModalListItem
            item={item}
            selectLanguage={selectLanguage}
            closeModal={closeModal}
          />
        );
      },
      [closeModal, selectLanguage]
    );
  
    return (
      <Modal
        style={modalStyle.modalContainer}
        animationType="slide"
        transparent={false}
        visible={visible}
      >
        <SafeAreaView style={modalStyle.modalTitle}>
          <Text style={modalStyle.modalTitleText}>
            Select a language for your toy
          </Text>
          <FlatList
            contentContainerStyle={modalStyle.modalFlatlistContiner}
            data={languages}
            renderItem={renderLanguageModalListItem}
          />
        </SafeAreaView>
      </Modal>
    );
  };
  

const modalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  modalFlatlistContiner: {
    flex: 1,
    justifyContent: "center",
  },
  modalCellOutline: {
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  modalTitle: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  modalTitleText: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 20,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default LanguageModal;
